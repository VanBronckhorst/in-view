import test from 'ava';
import Registry from '../src/registry';
import { inViewport } from '../src/viewport';

window.innerWidth = 1280;
window.innerHeight = 700;

test('Registry.check updates current', t => {

    let registry = Registry([{
        getBoundingClientRect() {
            return {
                bottom: 1,
                left: 1,
                right: 1,
                top: 1
            };
        }
    }, {
        getBoundingClientRect() {
            return {
                bottom: -1,
                left: -1,
                right: -1,
                top: -1
            };
        }
    }]);

    t.true(!registry.current.length);

    registry.check(0);

    t.true(registry.current.length === 1);

});

test('Registry.check emits enter events', t => {

    let stub = {
        getBoundingClientRect() {
            return {
                bottom: 1,
                left: 1,
                right: 1,
                top: 1
            };
        }
    };

    let registry = Registry([stub]);

    registry.on('enter', el => t.deepEqual(el, stub));
    registry.check(0);

});

test('Registry.check emits exit events', t => {

    let stub = {
        getBoundingClientRect() {
            return {
                bottom: -1,
                left: -1,
                right: -1,
                top: -1
            };
        }
    };

    let registry = Registry([stub]);

    registry.on('exit', el => t.deepEqual(el, stub));
    registry.check(0);

});

test('Registry.check returns the registry', t => {
    let registry = Registry([]);
    t.deepEqual(registry.check(0), registry);
});
