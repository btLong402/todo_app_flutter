import 'package:get/get.dart';
import 'package:todo_getx/controller/connecting_controller.dart';

import '../controller/authController.dart';

class InitDep implements Bindings {
  @override
  void dependencies() {
    Get.put(AuthController());
    Get.put(NetworkController());
  }
}
