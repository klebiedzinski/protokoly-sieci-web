import { useEffect, useState } from "react"
function TicTacToe() {


  const [fields, setFields] = useState(
    [
      {id: 0, value: "null"},
      {id: 1, value: ""},
      {id: 2, value: ""},
      {id: 3, value: ""},
      {id: 4, value: ""},
      {id: 5, value: ""},
      {id: 6, value: ""},
      {id: 7, value: ""},
      {id: 8, value: ""},
    ]
    )
  const postMove = useEffect( () => {
    fetch("/post", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(fields)
    })
  })
  const handleClickFields = (id) => {
    const newFields = fields.map((field,index) => {
      if (field.id === id) {
        return {
          id: id,
          value: "X"
        }
      }
      return field
    });

    setFields(newFields);
    console.log(fields)
    


  }
  return (
    <div className="TicTacToe">
        <h1>Tic Tac Toe</h1>
        <div className="info">
        </div>
        <div className="container">
            {fields.map(field => {
                return <button className='field' key={field.id} onClick={() => handleClickFields(field.id)}>{field.value}</button>
            })}
        </div>
    </div>
  );
}

export default TicTacToe;
