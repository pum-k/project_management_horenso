import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import { boardApi } from 'api/boardApi';
import moment from 'moment';

const initialState = {
  loading: false,
  listTask: [
    {
      id_column: 0,
      eachColumnTask: [],
    },
    {
      id_column: 1,
      eachColumnTask: [],
    },
    {
      id_column: 2,
      eachColumnTask: [],
    },
    {
      id_column: 3,
      eachColumnTask: [],
    },
  ],
  memberInJob: [],
};

export const fetchBoard = createAsyncThunk(
  'board/fetch',
  async (params, thunkAPI) => {
    let res = await boardApi.fetch(params);
    return res;
  }
);

export const addTask = createAsyncThunk(
  'board/add-task',
  async (params, thunkAPI) => {
    let res = await boardApi.addTask(params);
    thunkAPI.dispatch(addNewTask(res.infoTask));
    return res;
  }
);

export const editTaskAsync = createAsyncThunk(
  'board/edit-task',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(updateTask(params));
    let res = await boardApi.editTask(params.editTask);
    return res;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'board/delete-task',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(deleteTask(params));
    let res = await boardApi.deleteTask(params);
    return res;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const tempTask = {
        id: action.payload.idTask,
        title: 'action.payload.title',
        is_complete: action.payload.is_complete,
        description: action.payload.description,
        isOverdue: action.payload.isOverdue,
        process: action.payload.process,
        priority: action.payload.priority,
        start_time: moment(action.payload.start_time).format('YYYY-MM-DD'),
        end_time: moment(action.payload.end_time).format('YYYY-MM-DD'),
        taskers: action.payload.infoTaskers,
      };
      state.listTask[0].eachColumnTask.push(tempTask);
    },

    deleteTask: (state, action) => {
      const { id, columnId } = action.payload;
      const temp = state.listTask[columnId].eachColumnTask.filter(
        (task) => task.id !== id
      );
      state.listTask[columnId].eachColumnTask = temp;
    },

    updateTask: (state, action) => {
      const { editTask, columnId } = action.payload;
      const taskIndex = state.listTask[columnId].eachColumnTask.findIndex(
        (task) => task.id === editTask.taskId
      );

      const temp = {
        id: editTask.taskId,
        description: editTask.description,
        end_time: editTask.end_time,
        start_time: editTask.start_time,
        priority: editTask.priority,
        process: state.listTask[columnId].eachColumnTask[taskIndex].process,
        title: editTask.title,
        taskers: editTask.taskers,
        isOverdue: state.listTask[columnId].eachColumnTask[taskIndex].isOverdue,
        is_complete:
          state.listTask[columnId].eachColumnTask[taskIndex].is_complete,
      };
      state.listTask[columnId].eachColumnTask[taskIndex] = temp;
    },
    changeOverdue: (state, action) => {
      const { columnId, index } = action.payload;
      if (columnId !== 3) {
        state.listTask[columnId].eachColumnTask[index].isOverdue = true;
      }
      switch (columnId) {
        case '1': {
          state.listTask[0].eachColumnTask.push(
            ...state.listTask[1].eachColumnTask.filter(({ _, idx }) => {
              return idx === index;
            })
          );
          state.listTask[1].eachColumnTask =
            state.listTask[1].eachColumnTask.filter(({ _, idx }) => {
              return idx !== index;
            });
          break;
        }
        case '2': {
          state.listTask[0].eachColumnTask.push(
            ...state.listTask[2].eachColumnTask.filter(({ _, idx }) => {
              return idx === index;
            })
          );
          state.listTask[2].eachColumnTask =
            state.listTask[2].eachColumnTask.filter(({ _, idx }) => {
              return idx !== index;
            });
          break;
        }

        default:
          break;
      }
    },
  },
  extraReducers: {
    [fetchBoard.pending]: (state) => {
      state.loading = true;
    },
    [fetchBoard.rejected]: (state) => {
      state.loading = false;
    },
    [fetchBoard.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.listTask = action.payload.ListTask;
        state.memberInJob = action.payload.memberInJob;
        // Get task have being in progress
        const inProgress = state.listTask[0].eachColumnTask.filter((task) => {
          return moment().isBetween(
            moment(task.start_time).format('YYYY-MM-DD'),
            moment(task.end_time).format('YYYY-MM-DD')
          );
        });
        state.listTask[0].eachColumnTask =
          state.listTask[0].eachColumnTask.filter((task) => {
            return !moment().isBetween(
              moment(task.start_time).format('YYYY-MM-DD'),
              moment(task.end_time).format('YYYY-MM-DD')
            );
          });
        state.listTask[1].eachColumnTask.push(...inProgress);
        // Get task have finished and pass to review
      }
    },
    [addTask.pending]: (state) => {
      state.loading = true;
    },
    [addTask.rejected]: (state) => {
      state.loading = false;
    },
    [addTask.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        message.success('Success! Task has been created.');
      }
    },
    [editTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [editTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [editTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        message.success('Success! Task has been updated.');
      }
    },
    [deleteTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [deleteTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [deleteTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        message.success('Success! Task has been deleted.');
      }
    },
  },
});

export const { deleteTask, updateTask, changeOverdue, addNewTask } =
  boardSlice.actions;
export default boardSlice.reducer;
