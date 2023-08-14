import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:todo_getx/controller/authController.dart';
import 'package:todo_getx/views/widgets/input_field.dart';

class Register extends StatelessWidget {
  Register({super.key});
  final _formKey = GlobalKey<FormState>();
  final AuthController authController = Get.find();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 100),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Hello there,\nWelcome back!',
                style: TextStyle(
                  fontSize: 35,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Form(
                    key: _formKey,
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          InputField(
                            label: 'Email',
                            placeHolder: 'Enter your email',
                            controller: _emailController,
                            type: InputType.email,
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          InputField(
                            label: 'Password',
                            placeHolder: 'Enter password',
                            controller: _passwordController,
                            type: InputType.password,
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          InputField(
                            label: 'Password',
                            placeHolder: 'Enter password',
                            controller: _confirmController,
                            sp: _passwordController,
                            type: InputType.confirm,
                          ),
                          const SizedBox(
                            height: 40,
                          ),
                          ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all(
                                Colors.tealAccent.shade700,
                              ),
                              padding: MaterialStateProperty.all(
                                const EdgeInsets.symmetric(
                                    horizontal: 30, vertical: 10),
                              ),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20)),
                              ),
                              minimumSize: MaterialStateProperty.all(
                                const Size(
                                  250,
                                  50,
                                ),
                              ),
                            ),
                            child: const Text(
                              "SIGN UP",
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            onPressed: () {
                              if (_formKey.currentState!.validate()) {
                                authController.register(_emailController.text, _passwordController.text);
                              }
                            },
                          ),
                          const SizedBox(
                            height: 30,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text(
                                "Already a member? ",
                                style: TextStyle(
                                  // color: Colors.grey.shade900,
                                  fontSize: 16,
                                ),
                              ),
                              GestureDetector(
                                onTap: () {
                                  Get.back();
                                },
                                child: const Text(
                                  "Sign in",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ])),
              )
            ],
          ),
        ),
      )),
    );
  }
}