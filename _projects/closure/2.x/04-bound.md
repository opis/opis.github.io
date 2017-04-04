---
layout: project
permalink: closure/2.x/bound
title: Bounded objects
description: Learn how to serialize bounded objects
hidden: true
robots: nofollow, noindex
redirect_from: /closure/bound.html
---
# Bounded objects

Starting with PHP 5.4 the `$this` keyword can be used inside a closure's body 
if the closure was bound to an object. If you want to serialize the bounded object too, 
the only thing you are required to do is to pass `true `as the second parameter to the 
`Opis\Closure\SerializableClosure` constructor or to the 
`Opis\Closure\SerializableClosure::from`method. 

```php
$wrapper = new SerializableClosure($closure, true);
//or
$wrapper = SerializableClosure::from($closure, true);
```

## Example

Bellow is an example of a serializable class containing bounded closures (PHP >=5.4 only): 

```php
use Serializable;
use Opis\Closure\SerializableClosure;

class DynamicMethods implements Serializable
{

    protected $methods = array();
    private $the_answer = 052;
    
    public function __call($method, $args)
    {
        if (isset($this->methods[$method]))
        {
          return call_user_func_array($this->methods[$method], $args);
        }
        
        throw new \Exception("The method $method doesn't exists!");
    }
    
    public function addMethod($name, \Closure $func)
    {
        $func = $func->bindTo($this, $this);
        $this->methods[$name] = $func;
        return $func;
    }

    public function serialize()
    {
        $methods = array();
        
        SerializableClosure::enterContext();
        
        foreach ($this->methods as $name => $method)
        {
            $methods[$name] = SerializableClosure::from($method, true);
        }
        
        SerializableClosure::exitContext();
        
        return serialize(array(
            'methods' => $methods,
            'answer' => $this->the_answer,
        ));
    }

    public function unserialize($data)
    {
        $data = SerializableClosure::unserialize($data);
        $this->the_answer = $data['answer'];
        foreach ($data['methods'] as $name => $method)
        {
            $this->methods[$name] = $method->getClosure();
        }
    }

}
```

### Class usage

Now let's see how we can use the above created class: 

```php
// create a new instance
$dyn = new DynamicMethods();

// a simple sum function
$dyn->addMethod('sum', function($a, $b) {
    return $a + $b;
});

// a simple average function
$dyn->addMethod('avg', function () {
    if ($args = func_get_args()) {
        return array_sum($args) / count($args);
    }
    return 0;
});

// a function that calls another function
$dyn->addMethod('call', function($method) {
    // $this->methods is protected
    if (isset($this->methods[$method]))
    {
        $args = func_get_args();
        array_shift($args);
        return call_user_func_array($this->methods[$method], $args);
    }
    return false;
});

// a function that return a private property
$dyn->addMethod('answerUltimateQuestion', function() {
    // $this->the_answer is private
    return $this->the_answer;
});


// now we can serialize-unserialize the object
$newdyn = unserialize(serialize($dyn));

// test sum
echo "sum=", $newdyn->sum(5, 8), " "; //> 13
// test call with avg
echo "avg=", $newdyn->call('avg', 1, 2, 3), " "; //> 2
// now, the final answer...
echo "answer=", $newdyn->answerUltimateQuestion(), " "; // I'm curious too...

// no one should ever know the answer
$newdyn->addMethod('removeAnswer', function() {
    $this->the_answer = null;
    unset($this->methods['removeAnswer']);
    unset($this->methods['answerUltimateQuestion']);
});

$newdyn->removeAnswer();

// let's see if the answer is now secret

$otherdyn = unserialize(serialize($newdyn));

try {
  echo $otherdyn->answerUltimateQuestion(); // throws exception
}
catch (\Exception $e) {
  echo "The answer is secret!";
}
```