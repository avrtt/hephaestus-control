const { core, Node } = require('botcorejs')
log = console.log
class rmd extends Node {
    constructor(cfg) {
        super(cfg, core)
        this.connector = core.getConnector(cfg.addr)
        this.populate(['describe', 'stat', 'drop'])
    }

    start() {
        log('RMD ->', this.cfg.addr, '-> start')
        this.connector.describe('', []).then((data) => { log(data) }).catch((err) => { })
    }

    describe() {
        this.connector.describe('', []).then((data) => { log(data) })
    }

    drop(o0, o1) {
        this.connector.call('drop', o1 === 'undefined' ? [o0] : [o0, o1]).then((data) => { log(data) })
    }
}
module.exports = rmd
