<?php

namespace Crytek\Test;

use Crytek\EventEmitter;

class EventEmitterTest extends \PHPUnit_Framework_TestCase {

    private $emitter;

    public function setUp() {
        $this->emitter = new EventEmitter();
    }

    public function testAddListenerWithMethod() {
        $listener = new Listener();
        $this->emitter->on('testEvent', array($listener, 'onTestEvent'));
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testAddListenerWithInvalidListener()
    {
        $this->emitter->on('testEvent', 'not a callable');
    }
    
    public function testOnWithoutArguments()
    {
        $listenerCounter = 0;
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(1, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(2, $listenerCounter);
    }
    
    public function testOnWithArguments()
    {
        $listenerCounter = 0;
        $this->emitter->on('testEvent', function (...$arguments) use (&$listenerCounter) {
            
            $number = isset($arguments[0]) ?  $arguments[0] : 1;
            
            $listenerCounter += $number;
        });
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(1, $listenerCounter);
        $this->emitter->emit('testEvent',10);
        $this->assertSame(11, $listenerCounter);
    }
    
    public function testEmitWithMenyListeners()
    {
        $listenerCounter = 0;
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(2, $listenerCounter);
    }

    public function testRemoveListenerByCallBack()
    {
        $listenerCounter = 0;
        $listener = function () use (&$listenerCounter) {
            $listenerCounter++;
        };
        $this->emitter->on('testEvent', $listener);
        $this->emitter->removeListener('testEvent', $listener);
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(0, $listenerCounter);
    }
    
    
    public function testRemoveListenerWithWrongEventName()
    {
        $listenerCounter = 0;
        $listener = function () use (&$listenerCounter) {
            $listenerCounter++;
        };
        $this->emitter->on('testEvent', $listener);
        $this->emitter->removeListener('testEvent2', $listener);
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(1, $listenerCounter);
    }   
    
    public function testRemoveAllListenersWithEventName()
    {
        $listenerCounter = 0;
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->emitter->removeAllListeners('testEvent');
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(0, $listenerCounter);
    }
    
    public function testRemoveAllListenersrWithWrongEventName()
    {
        $listenerCounter = 0;
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->emitter->removeAllListeners('testEvent2');
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->assertSame(1, $listenerCounter);
    }
    
    public function testRemoveAllListeners()
    {
        $listenerCounter = 0;
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->emitter->on('testEvent', function () use (&$listenerCounter) {
            $listenerCounter++;
        });
        $this->emitter->removeAllListeners();
        $this->assertSame(0, $listenerCounter);
        $this->emitter->emit('testEvent');
        $this->emitter->emit('testEvent');
        $this->assertSame(0, $listenerCounter);
    }
    
}
