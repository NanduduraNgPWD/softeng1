import './style.css';

 function Background(props) {
    return(
        <section className='home-1 listing-bg'>
        <div className='home-1-content'>
          <p id='heading-home'> {props.title}</p>
          <p id='text-home'>{props.description}</p>
  
        </div>
      </section>
    )
}
export default Background;