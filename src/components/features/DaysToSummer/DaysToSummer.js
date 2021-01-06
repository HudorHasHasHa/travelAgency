import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  constructor(){
    super();
  }

  getCountdownDate() {
    const currentTime = new Date();
    const nextSummer = new Date('June 21, 2021 00:00:00');

    if(currentTime.getUTCMonth() >= nextSummer.getUTCMonth() && currentTime.getUTCFullYear() == nextSummer.getUTCFullYear){
      nextSummer.setUTCFullYear(nextSummer.getUTCFullYear()+1);
    }else if (currentTime.getUTCMonth() <= nextSummer.getUTCMonth() && currentTime.getUTCFullYear() > nextSummer.getUTCFullYear()){
      nextSummer.setUTCFullYear(currentTime.getUTCFullYear());
    } else if (currentTime.getUTCMonth() >= nextSummer.getUTCMonth() && currentTime.getUTCFullYear() > nextSummer.getUTCFullYear()){
      nextSummer.setUTCFullYear(currentTime.getUTCFullYear() + 1 );
    }

    /* wstecz chyba not needed?
    else if (currentTime.getUTCMonth() <= nextSummer.getUTCMonth() && currentTime.getUTCFullYear() < nextSummer.getUTCFullYear()){
      nextSummer.setUTCFullYear(currentTime.getUTCFullYear());
    }else if (currentTime.getUTCMonth() >= nextSummer.getUTCMonth() && currentTime.getUTCFullYear() < nextSummer.getUTCFullYear()){
      nextSummer.setUTCFullYear(currentTime.getUTCFullYear() + 1);
    }*/

    const timeToSummer = nextSummer.getTime() - currentTime.getTime();
    const daysToSummer = timeToSummer/(24*3600*1000);

    if(currentTime.getUTCMonth()>=6 && currentTime.getUTCMonth() < 10 && daysToSummer < 1){
      return ' ';
    }
    else if(daysToSummer==1 && currentTime.getUTCMonth()==6){
      return Math.round(daysToSummer);
    }
    else{
      return Math.round(daysToSummer);
    }
  }

  /*
  const currentDate  currentTime.toISOString().substr(0, 10);
  const currentDate = currentDate.replace(':', '');
  const
  */

  render(){
    const time = this.getCountdownDate();
    return(
      <div>
        {(time==1) ? <div className={styles.daysToSummerComponent}>{time} day to summer!</div> :
          (time > 1) ? <div className={styles.daysToSummerComponent}>{time} days to summer!</div> :
            (time < 1) ? <div className={styles.daysToSummerComponent}></div> : null
        }
      </div>
    );
  }
}

DaysToSummer.propTypes = {
  days: PropTypes.any,
};

export default DaysToSummer;
