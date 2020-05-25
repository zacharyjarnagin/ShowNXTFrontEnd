import React from "react";
import {
  Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Platform
} from "react-native";
import Login from "../api-functions/Login";

// galio component
import {
  Block, Button, Input, NavBar, Text
} from "galio-framework";
import theme from "../theme";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

class LoginScreen extends React.Component {
  state = {
    email: "-",
    password: "-",
    emailError: "",
    generalError: "",
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { navigation } = this.props;
    const { email, password, emailError, generalError } = this.state;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Sign In"
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === "android" ? { marginTop: theme.SIZES.BASE } : null}
        />
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
          <Block flex center style={{
            marginTop: theme.SIZES.BASE * 1.875,
            marginBottom: height * 0.1
          }}>
            <Text muted center size={theme.SIZES.FONT * 0.875}
                  style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}>
              blah blah blah blah
            </Text>
          </Block>

          <Block flex={4} center space="evenly">
            <Block flex>
              <Text muted left size={theme.SIZES.FONT * 0.875} color={theme.COLORS.ERROR}>
                {this.state.generalError}
              </Text>
              <Input
                rounded
                type="email-address"
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={this.state.emailError === '' && this.state.generalError === ''  ? theme.COLORS.GREY : theme.COLORS.ERROR}
                style={[{ width: width * 0.9}, this.state.emailError === '' && this.state.generalError === ''  ? {borderWidth: 1} :
                  {borderWidth: 3}, this.state.emailError === '' && this.state.generalError === '' ? {borderColor: theme.COLORS.GREY} :
                  {borderColor: theme.COLORS.ERROR}]}
                onChangeText={text => this.handleChange("email", text)}
              />
              <Text muted left size={theme.SIZES.FONT * 0.875} color={theme.COLORS.ERROR}>
                {this.state.emailError}
              </Text>
              <Input
                rounded
                password
                viewPass
                placeholder="Password"
                placeholderTextColor={this.state.generalError === ''  ? theme.COLORS.GREY : theme.COLORS.ERROR}
                style={[{ width: width * 0.9}, this.state.generalError === '' ? {borderWidth: 1} :
                  {borderWidth: 3}, this.state.generalError === '' ? {borderColor: theme.COLORS.GREY} :
                  {borderColor: theme.COLORS.ERROR}]}
                onChangeText={text => this.handleChange("password", text)}
              />
              <Text
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => Alert.alert("Not implemented")}
                style={{
                  alignSelf: "flex-end",
                  lineHeight: theme.SIZES.FONT * 2
                }}
              >
                Forgot your password?
              </Text>
            </Block>
            <Block flex middle>
              <Button
                round
                color="error"
                onPress={() => {
                  Login(email, password)
                    .then((response) => {
                      this.handleChange("emailError", "");
                      this.handleChange("generalError", "");
                      if (response.hasOwnProperty("error")) {
                        if(response.error === `auth/user-not-found`) this.handleChange("emailError", "Email not found");
                        if(response.error === `auth/invalid-email`) this.handleChange("emailError", "Email not valid");
                      }
                      if (response.hasOwnProperty("general")) this.handleChange("generalError", "Invalid Credentials");
                      if (response.hasOwnProperty("token")) console.log(response.token);
                    });
                }
                }
              >
                Sign in
              </Button>
              <Button color="transparent" shadowless
                      onPress={() => navigation.navigate("Register")}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                  {"Don't have an account? Sign Up"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  }
});

export default LoginScreen;
