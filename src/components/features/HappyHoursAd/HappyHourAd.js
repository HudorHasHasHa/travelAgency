import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';

class HappyHourAd extends React.Component{
  constructor(){
    super();

    /* run this.forceUpdate() every second */
    setInterval(() => {this.forceUpdate();}, 1000);
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate(),
      12, 0, 0, 0));

    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  // happyHoursDisplay() {
  //   const time = this.getCountdownTime();
  //   if(time < (23 * 60 * 60 * 1000)){
  //     return this.getCountdownTime();
  //   }else{
  //     return this.promoDescription;
  //   }
  // }

  // happyHoursTimeFormat(time){
  //   const happyhour = time;
  //   const tab = [];
  //   tab.push( Math.floor(happyhour%60),  Math.floor(happyhour/60%60),  Math.floor(happyhour/3600));
  //   // const final = tab.map( element => `${element+100}`.substring(1));
  //   return tab[2] + ':' + tab[1] + ':' + tab[0];
  // }

  render() {
    const time = this.getCountdownTime();
    const {title, promoDescription} = this.props;
    // const currentTime = new Date();
    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        {(time > 23*60*60 ) ?
          (<div className={styles.promoDescription}>{promoDescription}</div>)
          :
          (<div className={styles.promoDescription}>{(time)}</div>)
        }
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.any,
  time: PropTypes.number,
};

export default HappyHourAd;
