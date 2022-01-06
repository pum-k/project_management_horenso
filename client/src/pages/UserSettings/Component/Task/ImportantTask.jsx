import React from 'react'
import { List } from 'antd'

const ImportantTask = ({tasks}) => {
  const { Item } = List

  const importantTasks = tasks.filter((task) => {
    if (task.status === "In Progress") {
      return task;
    }
  })

  return (
    <List
      itemLayout='horizontal'
      dataSource={importantTasks}
      renderItem={item => (
        <Item>
          <Item.Meta 
            title={
              <a style={{fontSize: 20}}>
                {item.title}
              </a>
            }
          />
          <button
            className={
              item.status ==='Approved' ? 'approved-decor' :
              (item.status ==='In Progress' ? 'progress-decor' :
                'review-decor'
              )
            }
          >
            <p
              className={
              item.status ==='Approved' ? 'approved-decor__text' :
              (item.status ==='In Progress' ? 'progress-decor__text' :
                'review-decor__text'
              )
            }
            >
              {item.status}
            </p>
          </button>
        </Item>
      )}
    />
  )
}


export default ImportantTask