Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleTap: function() {
      if(!this.properties.disabled) {
        this.triggerEvent('click')
      }
    }
  }
})