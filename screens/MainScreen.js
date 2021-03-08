import React from "react";
import {  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView, } from "react-native";
import db from "../config";
import firebase from "firebase";

export default class MainScreen extends React.Component {

constructor(){
    super();
    this.state={
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      isModalVisible: "false",
      
    }
}

userLogin = (emailId, password)=>{
  firebase
  .auth()
  .signInWithEmailAndPassword(emailId, password)
  .then(() => {
   return Alert.alert("You Have Successfully logged in")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage);
  });
}

 userSignUp=(emailId, password,confirmPassword)=>{
  if (password !== confirmPassword) {
    return Alert.alert("password doesn't match,Check your password.");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then(() => {
        db.collection("Users").add({
          First_name: this.state.firstName,
          last_name: this.state.lastName,
          contact: this.state.contact,
          email_id: this.state.emailId,
          address: this.state.address,
        });
        return Alert.alert("User Added Successfully", "", [
          {
            text: "OK",
            onPress: () => this.setState({ isModalVisible: false }),
          },
        ]);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  }
 }


 showModal = () => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={{ width: "100%" }}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text style={styles.modalTitle}>Registration</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={"First Name"}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={"Last Name"}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={"Contact"}
              maxLength={10}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  contact: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={"Email"}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={"Confrim Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isModalVisible: false })}
              >
                <Text style={{ color: "#ff5722" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );
};






  render() {
    return (
      <View style={{alignItems:"center",backgroundColor:"#87CEFA",paddingBottom:120}} >
        <Text style={styles.title} >BARTER SYSTEM APP</Text>

        <TextInput
        placeholder='Enter Email Id, e.g;- abc@gmail.com'
        keyboardType="email-address"
         style={styles.textInputFont}
         onChangeText={(text)=>{
             this.setState({
                 emailId:text
             })
         }}
        />
        
        <TextInput
        placeholder='Enter Password'
        keyboardType="email-address"
        style={styles.textInputFont}
         secureTextEntry={true}
         onChangeText={(text)=>{
            this.setState({
                password:text
            })
        }}
        
        />
       <TouchableOpacity style={styles.button}
       onPress={() => {
        this.userLogin(this.state.emailId, this.state.password);
      }}>
           <Text style={styles.buttonText}>LOGIN</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} 
         onPress={() => this.setState({ isModalVisible: true })}
       >
           <Text style={styles.buttonText}>SIGN UP</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
    textContainer:{
        color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    title:{
      fontSize: 65,
      fontWeight: "300",
      paddingBottom: 30,
      color: "white",
      fontWeight:"bold"
    },
    textInputFont:{
        width: 340,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: "blue",
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        marginBottom:30,
        marginTop:100
    },
    button: {
      width: 300,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      backgroundColor: "purple",
       marginTop:30
      },
      buttonText: {
      width: 300,
      height: 40,
      justifyContent: "center",
      alignItems:"center",
      marginLeft:220,
      marginTop:10,
      fontSize: 20,
      color:"white",
      
      },
      formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: "center",
        borderColor: "#ffab91",
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
      },
      registerButton: {
        width: 200,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
      },
      registerButtonText: {
        color: "#ff5722",
        fontSize: 15,
        fontWeight: "bold",
      },
      KeyboardAvoidingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalTitle: {
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 30,
        color: "#ff5722",
        margin: 50,
      },
      modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffff",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
      },
  });
