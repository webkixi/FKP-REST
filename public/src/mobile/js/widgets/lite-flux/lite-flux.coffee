module.exports = {
    Store: require('./lib/store'),
    Action: require('./lib/action'),
    mixins:{
        StoreWatchMixin: require('./lib/mixins/store-watch')
    }
}
