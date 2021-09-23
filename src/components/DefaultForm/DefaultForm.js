import React from 'react';
import './DefaultForm.css';
import Logo from '../Logo/Logo';

export default function Form(props) {
    return (
    <section className="form">
      <form className="form__container"
        id={props.id}
        onSubmit={props.onSubmit}
        noValidate
        name={`form-${props.name}`}>
        <Logo />
        <h2 className="form__title">{props.title}</h2>
        {props.children}
        
        {props.Link}
      </form>
    </section>



  )
}

