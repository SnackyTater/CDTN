import { IconButton, Carousel } from '../../../../../component';
import { Close, Favorite, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { ageCalulator } from '../../../../../utils/utils';

import './match-card.scss';
export default function MatchCard({info, like, nope, prev, next, value}) {
    const userInfo = info?.info;
    const distance = info.distance;

    const iconConfig = (color) => {
        return {
            width: '30px',
            height: '30px',
            color: color
        }
    }

    const buttonList = [
        {
            color: '#fff',
            icon: <ArrowBackIosNew sx={iconConfig('#fff')}/>,
            onClick: prev
        },
        {
            color: '#ff4458',
            icon: <Close sx={iconConfig('#ff4458')}/>,
            onClick: nope
        },
        {
            color: '#21d07c',
            icon: <Favorite sx={iconConfig('#21d07c')}/>,
            onClick: like
        },
        {
            color: '#fff',
            icon: <ArrowForwardIos sx={iconConfig('#fff')}/>,
            onClick: next
        },
    ]

    const imageList = userInfo?.profileImage || []

    return (
        <div className='match-card'>
            <div className='match-card__info'>
                <div className='match-card__info__carousel'>
                    <Carousel>
                        {
                            imageList.map((image, index) => <img key={index} className='img' src={image?.imageURL}/>)
                        }
                    </Carousel>
                </div>
                <div className='match-card__info__content'>
                    <div>
                        <span className='match-card__info__content-name'>
                            {userInfo?.fullName.toString()}
                        </span>
                        <span className='match-card__info__content-age'>
                            {ageCalulator(userInfo?.DateOfBirth).toString()}
                        </span>
                        {/* <span>{`${Math.floor(distance)} km away`}</span> */}
                    </div>
                    <div>
                        <span className='match-card__info__content-description'>
                            {userInfo?.description.toString() || 'lorem ipsum'}
                        </span>
                    </div>
                </div>
            </div>
            <div className='match-card__button'>
                {
                    buttonList.map((button, index) => <IconButton
                        value={value}
                        key={index}
                        onClick={(e) => button.onClick(value)}
                        config={{
                            width: '70px',
                            height: '70px',
                            border: `1px solid ${button.color}`
                        }}
                        icon={button.icon}
                    />)
                }a
            </div>
        </div>
    )
}