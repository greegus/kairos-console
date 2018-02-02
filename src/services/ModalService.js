import uuid from 'uuid'
import Vue from 'vue'

export default {
  $bus: new Vue(),

  open(component, data) {
    return new Promise((resolve, reject) => {
      const modal = {
        id: uuid.v4(),
        component,
        data,
        resolve
      }

      this.$bus.$emit('open', modal);
    })
  },
}
