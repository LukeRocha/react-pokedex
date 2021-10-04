import React from 'react'

const pokemonThumbNail = ({id, name, image, type}) => {
  const style = `thumb-container ${type}`
  return (
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <h3>Type: {type}</h3>
      </div>
    </div>
  )
}

export default pokemonThumbNail
