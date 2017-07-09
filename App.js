import React from 'react';
import { StyleSheet, Text, View, Image, Button, Animated, Easing, ScrollView } from 'react-native';

class Buttons extends React.Component {
  render() {
    const { fetchImage, like, email, numLikes } = this.props;
    return (
      <View>
        <Button onPress={fetchImage} title='➡️'/>
        <Like onPress={like} title={numLikes}/>
        <Button onPress={email} title='🔂'/>
      </View>
    );
  }
}

class Like extends React.Component {
    render() {
    return(
      <View 
        style={{
          flexDirection:'row',
          alignItems: 'center',
        }}
      >
        <Text> {this.props.title} </Text>
        <Button onPress={this.props.onPress} title='👍'/> 
      </View>
    );
  }
}

class NyanCat extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.Value(0);
  }

  
  run() {
    this.position.setValue(0);
    const config = {
      toValue: 800,
      duration: 1000,
      easing: Easing.linear,
    };
  Animated.timing(this.position, config).start(() => this.run());
  }

  render() {

    const catAnimation = {
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 300,
      height: 300,
      marginRight: 600,
      transform: [{ translateX: this.position }]

    }

    this.run(); 
    return (
      <Animated.View style={catAnimation}>
        <Image 
          source={{ uri: 'http://www.nyan.cat/cats/america.gif'}}
          style={{ width: 258, height: 181 }}
        />
      </Animated.View>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageUrl: ' ',
      
    };
  }


  componentWillMount() {
    this.handlePress();
  }

  handlePress = () => {
    fetch('http://thecatapi.com/api/images/get?type=gif')
      .then(response => {
        this.setState({ imageUrl: response.url, loading: false });
      });
  }

  handleLike = () => {
    this.props.likedPics(this.state.imageUrl);
  }

  handleEmail = () => {
    console.log( 'Hey, I found something really cool! ' + this.state.imageUrl);
  }

  render() {
    const title = this.props.title;
    const { loading } = this.state;
    return (
      <View style={styles.container}>

        <Text> {title} </Text>
        {loading === true ? (
            <NyanCat/>
          ) : (
        <Image
          source={{ uri: this.state.imageUrl}}
          style={{ width: 300 , height:300 }}
        />)}

        <Buttons
          fetchImage={this.handlePress}
          like={this.handleLike}
          email={this.handleEmail}
          numLikes={this.props.numLikes}
        />

      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      numberOfLikes: new Array(10),
    }
    this.state.numberOfLikes.fill(0);
    console.log(this.state);
  }

  createHandleLike = (cardIndex) => {
    return (imageUrl) => {
      const tempLikes = this.state.numberOfLikes.slice();
      tempLikes[cardIndex] = tempLikes[cardIndex] + 1;
      this.setState({numberOfLikes: tempLikes})
    }
  }
  handlePress = () => {
    this.setState({ loading: true, numberOfLikes: 0 });
  }
  handleLike = (imageUrl) => {
    this.setState({ numberOfLikes: this.state.numberOfLikes + 1 });
    console.log('I like ' + imageUrl);
  }

  render() {
    const cards = [];
    for (let i = 0; i < 10; i++){
      cards.push(<Card numLikes={this.state.numberOfLikes[i]} likedPics={this.createHandleLike(i)} key={i} title="Random Cats!" />);
    }
    

    return (
      <ScrollView style={{backgroundColor: '#f9c0ea'}} contentContainerStyle={styles.container}>
        {cards}
        <Text> Join Ardent Academy today! </Text>
      </ScrollView>
    );
  }
 /* JSX looks like
 <ComponentName  title= " My custom title"  
 <ComponentName propName={require(' .?Meowmix.jpeg')}>

 */

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9c0ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
