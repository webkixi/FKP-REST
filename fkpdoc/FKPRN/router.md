# fkp-react-native-router
react-native router, it from `FKP-REACT-NATIVE`     
抽离自`FKP-REACT-NATIVE`框架  

### Demo   
[实例](https://github.com/webkixi/fkp-demo-rn_router)   

![demo](/images/demo/rn_router.gif)  


## Install  
```
npm install fkp-react-native-router -S
```


## Introduce
有三个部分 `route`, `router`, `page`.  
1. route: define  
2. router: jump to router item  
3. page: receive the intent and do something...

include android back and dblclick exit
包含后退，及双击退出   

## Sample code  
> index.js  

```js
import React, { Component } from 'react';
import {route} from 'fkp-react-native-router';  // route

export default class start extends Component {
    render(){
        return (
            route.init( {
                aaa: require('./aaa').default,
                bbb: require('./bbb').default,
                ccc: require('./ccc').default,
            })
            .start('aaa', {message: 'start'})
        )
    }
}
```  

> aaa.js  

```js  
import {page, router} from 'fkp-react-native-router';

let _Page;  //scope variable
let _Intent;
//....
//....
class Home extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Button
              containerStyle={styles.button}
              style={{fontSize: 20, color: '#fff'}}
              styleDisabled={{color: 'red'}}
              onPress={() => {
                  _Page.router('bbb', {message: 'from aaa jump to bbb'})
              }}>
              Jump to bbb!
          </Button>
          <Button
              containerStyle={styles.button}
              style={{fontSize: 20, color: '#fff'}}
              styleDisabled={{color: 'red'}}
              onPress={() => {
                  router('ccc', {message: 'from aaa jump to ccc'})
              }}>
              Jump to ccc!
          </Button>
          // ....
        </View>
      );
    }
}

export default function start(id){
    return page.new({
        trigger: function(self, intent){
            _Page = this;
            _Intent = intent;
            return <Home data={intent}/>
        }
    })
}
```  

> bbb.js  

```js
import {page, router} from 'fkp-react-native-router';
// ....
// ....
let _Intent;

class Bbb extends Component {
    componentDidMount() {
        Toast.show(_Intent.message);
    }
    // ....
    render(){
        // ....
    }
}

export default function start(id){
    return page.new({
        trigger: function(self, intent){
            return <Bbb />
        }
    })
}
```

> ccc.js  

```js
import {page, router} from 'fkp-react-native-router';
// ....
// ....

class Ccc extends Component {
    componentDidMount() {
        Toast.show(_Intent.message);
    }
    // ....
    render(){
        // ....         
    }
}

export default function ccc(id){
    return page.new({
        trigger: function(self, intent){             
            return <Ccc data={intent}/>
        }
    })
}
```
