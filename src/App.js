import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }
  // }
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user });
      //createUserProfileDocument(user);
      //console.log(user);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //Read DocumentSnapshot
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return <div className='App'>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />        
        <Route path='/checkout' component={CheckoutPage}/>
        <Route exact path="/signin" render ={()=>this.props.currentUser? (<Redirect to ='/'/>):(<SignInAndSignUpPage />)} />

      </Switch>
    </div>;
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
