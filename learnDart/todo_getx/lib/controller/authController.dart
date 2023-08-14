// ignore_for_file: file_names
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:todo_getx/views/home_page.dart';

import '../views/login_page.dart';

class AuthController extends GetxController{
  late Rx<User?> user;  
  final FirebaseAuth _auth = FirebaseAuth.instance;
  @override
  void onReady(){
    super.onReady();
    user = Rx<User?> (_auth.currentUser);
    user.bindStream(_auth.userChanges());
    ever(user, _initialScreen);
  }

  _initialScreen(User? user){
    if(user == null) {
      Get.offAll(() => LoginPage());
    } else {
      Get.offAll(() => const HomePage());
    }
  }

  void register(String email, String password) async {
    try{
      await _auth.createUserWithEmailAndPassword(email: email.trim(), password: password.trim());
    }catch(e){
      Get.snackbar('Can\'t create account ', e.toString(), snackPosition: SnackPosition.TOP);
    }
  }

  void login(String email, String password) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email.trim(), password: password.trim());
    } catch (e) {
      Get.snackbar('Can\'t Sign in ', e.toString(),
          snackPosition: SnackPosition.TOP);
    }
  }
  void logout() async{
    await _auth.signOut();
  }
}
