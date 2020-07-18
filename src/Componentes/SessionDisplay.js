import React from 'react';
import '../Componentes/SessionDisplay.css'

const sessionConfig={
    summer:{
        text:'lets hit the beach!',
        iconName: 'sun'
    },
    winter:{
        text:'burr, it is cold!',
        iconName:'snowflake'
    }
};

const getSession=(lat,month)=>{
  if(month > 2 && month < 9 ){
      return lat > 0 ? 'summer':'winter'
  }else{
      return lat > 0 ? 'winter':'summer'
  }
    
};

const SessionDispaly=(props)=>{
        
           const session= getSession(props.latitude,new Date().getMonth());
           const {text,iconName}=sessionConfig[session];
            return (
            <div className={`session-display ${session}`}>  
                <i className={`icon-left massive ${iconName} icon`}/>
                <h1>{text}</h1>
                <i className={`icon-right massive ${iconName} icon`}/>
            </div>
            );

};

export default SessionDispaly;