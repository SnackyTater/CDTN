import './logo.scss';

export default function logo({mode}) {
    return (
        <a href='/' className='logo'>
            <title>Cosmitto</title>
            <img src={process.env.PUBLIC_URL + '/assets/logo.png'} style={{"width": '38px', "height": '38px'}} alt=''/>        
            <p className={`logo__title--${mode}`}>Cosmitto</p>
        </a>
    )
}
