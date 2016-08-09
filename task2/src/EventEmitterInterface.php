<?php

namespace Crytek;

interface EventEmitterInterface {

    public function on($event, $listener);

    public function removeListener($event, $listener);

    public function removeAllListeners($event = null);

    public function emit($event, ...$arguments);
}
