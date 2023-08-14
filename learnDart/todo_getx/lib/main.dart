import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:todo_getx/controller/authController.dart';
import 'package:todo_getx/controller/connecting_controller.dart';
// import 'package:todo_getx/controller/connecting_controller.dart';
import 'package:todo_getx/views/home_page.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:todo_getx/views/login_page.dart';
import 'firebase_options.dart';
import 'db/db_helper.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await GetStorage.init();
  await DBHelper().database;
  Get.put(AuthController());
  Get.put(NetworkController());
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});
  @override
  Widget build(BuildContext context) {
    // SystemChrome.setEnabledSystemUIMode(SystemUiMode.leanBack);
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      home: FirebaseAuth.instance.currentUser != null ?  const HomePage() : LoginPage()
    );
  }
}
