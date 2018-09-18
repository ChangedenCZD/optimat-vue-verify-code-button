import { BaseModule } from './lib/BaseModule';

class Component extends BaseModule {
    constructor () {
        super();
        this.setProps(['options']);
        this.setComponent({});
        this.setMethod({
            setOptions () {
                let options = this.options || {};
                this.status = Math.max(typeof options.status === 'number' ? Math.min(options.status, 2) : 0, 0);
                this.defaultDelay = typeof options.delay === 'number' ? Math.max(options.delay, 60) : 60;
                this.defaultHint = options.hint || '获取验证码';
                this.setHint();
                this.autoChangeStatus = typeof options.autoChangeStatus === 'boolean' ? options.autoChangeStatus : true;
                this.onSubmit = typeof options.onSubmit === 'function' ? options.onSubmit : null;
                this.onStartCounting = typeof options.onStartCounting === 'function' ? options.onStartCounting : null;
                this.onStopCounting = typeof options.onStopCounting === 'function' ? options.onStopCounting : null;
                this.onCounting = typeof options.onCounting === 'function' ? options.onCounting : null;
                this.onStatusChanged = typeof options.onStatusChanged === 'function' ? options.onStatusChanged : null;
                this.backgroundColor = typeof options.backgroundColor === 'string' && options.backgroundColor.indexOf('#') === 0 ? options.backgroundColor : '#00AAEE';
                this.textColor = typeof options.textColor === 'string' && options.textColor.indexOf('#') === 0 ? options.textColor : '#FFFFFF';
            },
            startCounting () {
                this.stopCounting();
                this.$nextTick(() => {
                    this.onStartCounting && this.onStartCounting();
                    this.count = this.defaultDelay;
                    this.timerId = setInterval(() => {
                        let count = this.count;
                        count -= 1;
                        if (count <= 0) {
                            this.stopCounting();
                        } else {
                            this.count = count;
                        }
                        this.onCounting && this.onCounting(count);
                    }, 1000);
                });
            },
            stopCounting () {
                let timerId = this.timerId;
                this.count = 0;
                this.timerId = null;
                if (timerId) {
                    clearInterval(timerId);
                    this.onStopCounting && this.onStopCounting();
                    this.$nextTick(() => {
                        if (this.autoChangeStatus && this.status !== 0) {
                            this.status = 0;
                        }
                    });
                }
            },
            onClick (e) {
                let id;
                if ((id = e.target.id)) {
                    switch (id) {
                        case 'valid':
                            if (this.autoChangeStatus) {
                                this.status = 1;
                            }
                            this.tryToSubmit();
                            break;
                        case 'invalid':
                            this.tryToSubmit();
                            break;
                    }
                }
            },
            tryToSubmit () {
                this.onSubmit && this.onSubmit(this.status, this.count);
            },
            setHint () {
                switch (this.status) {
                    case 0:
                        this.hint = this.defaultHint;
                        break;
                    case 1:
                        this.hint = `${this.count}秒后重试`;
                        break;
                    case 2:
                        this.hint = this.defaultHint;
                        break;
                }
            }
        });
        this.setCompute({
            isStandBy () {
                return this.status === 0;
            }
        });
        this.setWatch({
            options () {
                this.setOptions();
            },
            status (value) {
                this.onStatusChanged && this.onStatusChanged(value);
                switch (value) {
                    case 0: // 等待点击
                        this.stopCounting();
                        break;
                    case 1: // 开始倒数
                        this.startCounting();
                        break;
                    case 2: // 无法点击
                        break;
                }
            },
            count () {
                this.setHint();
            }
        });
    }

    getData () {
        return {
            status: -1,
            hint: '',
            defaultHint: '获取验证码',
            defaultDelay: 60,
            count: -1,
            autoChangeStatus: true,
            timerId: null,
            textColor: '#FFFFFF',
            backgroundColor: '#00AAEE'
        };
    }

    onCreate () {
        this.app.setOptions();
    }

    onMount () {
    }
}

module.exports = Component;
