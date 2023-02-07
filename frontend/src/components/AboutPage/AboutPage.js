
import './AboutPage.css'





const AboutPage = () => {
    return (
        <div className="aboutPageContainer">
            {/* <div className='aboutPageHeader'>
                Thanks for visiting!
            </div> */}
            <div className='playerCard'>
                <div className='playerCard-left'>
                    <img className="indiImage" src={require('./andrew.png')} alt='svgImage' />
                </div>
                <div className='playerCard-right'>
                    <div className='descContainer'>
                        <div className='description'>Hey I'm Andrew! Thanks for visiting my site! If you have any suggestions on improvements or wish to connect, click below!</div>
                    </div>
                    <div className='socialLinks'>
                        <a href='https://github.com/adotk24' target="_blank" class='aboutPage'>
                            <img className='gitHub' src={require('./github-mark.png')} alt='github' />
                        </a>
                        <a href='https://linkedin.com/in/andrewkimcode' target="_blank" class='aboutPage'>
                            <img className='linkedin' src={require('./linkedin.png')} alt='linkedin' />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AboutPage
