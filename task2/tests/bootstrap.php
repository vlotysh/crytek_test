<?php

require __DIR__.'/../vendor/autoload.php';

$autoload = new Composer\Autoload\ClassLoader();
$autoload->addPsr4('Crytek\\Test\\', __DIR__ . '/src');
$autoload->register();