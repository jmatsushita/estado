import defaults from 'lodash/object/defaults'
import curry from 'lodash/function/curry';

import State from './state';

export default class Machine extends State {
  constructor(data, options = {}) {    
    super(data);

    this.options = defaults(options, {
      deterministic: true
    });

    this.mapStateRefs();
  }

  transition(fromState = null, action = null) {
    let states = super.transition(fromState, action);

    if (this.options.deterministic) {
      return states.length
        ? states[0]
        : false;
    }

    return states;
  }
}

