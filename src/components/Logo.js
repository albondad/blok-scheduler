import React from 'react';
import logoImage from '../logo.jpg';

let logo = () => {
  return(
    <div id='logoContainer'>
      {/*<span id='logoText'>bl<span id='logoIcon'><i className="fas fa-clock"></i></span>k</span>*/}
      <img id='logoImage' src={logoImage} />
    </div>
  )
}

export default logo;
