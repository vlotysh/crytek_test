<?php

namespace Crytek;

class EventEmitter implements EventEmitterInterface {

    protected $listeners = [];
    
    /**
     * 
     * Attach listener to event
     * 
     * @param String $event
     * @param Callable $listener
     * @throws \InvalidArgumentException
     */
    public function on($event, $listener) {
        if (!is_callable($listener)) {
            throw new \InvalidArgumentException('The provided listener was not a valid callable.');
        }
        if (!isset($this->listeners[$event])) {
            $this->listeners[$event] = [];
        }
        $this->listeners[$event][] = $listener;
    }
    
    /**
     * 
     * Remove attached listener by event name
     * 
     * @param String $event
     * @param Callable $listener
     */
    public function removeListener($event, $listener) {
        if (isset($this->listeners[$event])) {
            if (false !== $index = array_search($listener, $this->listeners[$event], true)) {
                unset($this->listeners[$event][$index]);
            }
        }
    }
    
    /**
     * 
     * Remove all attached listeners by event name
     * 
     * @param String $event
     */
    public function removeAllListeners($event = null) {
        if ($event !== null) {
            unset($this->listeners[$event]);
        } else {
            $this->listeners = [];
        }
    }

    /**
     * 
     * Event trigger
     * 
     * @param String $event
     * @param Mixed $arguments
     */
    public function emit($event, ...$arguments) {
        
        if(!isset($this->listeners[$event])) {
            return false;
        }
        
        foreach ($this->listeners[$event] as $listener) {
            call_user_func_array($listener, $arguments);
        }
    }

}
