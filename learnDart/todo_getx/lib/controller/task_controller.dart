import 'package:firebase_auth/firebase_auth.dart';
// import 'package:flutter_offline/flutter_offline.dart';
import 'package:get/get.dart';
// import 'package:todo_getx/controller/connecting_controller.dart';
import 'package:todo_getx/db/db_cloud.dart';
import 'package:todo_getx/db/db_helper.dart';
import 'package:todo_getx/models/tasks.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:uuid/uuid.dart';

class TaskController extends GetxController {
  // final AuthController user = Get.find();
  // final NetworkController _networkController = Get.find();
  final RxList taskList = <Task>[].obs;
  final taskOff = <Task>[];
  List<String> deleteQueue = [];
  bool connection = true;
  CollectionReference taskCollection =
      FirebaseFirestore.instance.collection("To Do App");
  Future<void> getTask() async {
    final List<Map<String, dynamic>> tasks = await DBHelper().queryAllRows();
    taskList.assignAll(tasks.map((data) => Task.fromMap(data)).toList());
  }

  addTask(Task task) async {
    String uid = const Uuid().v4();
    task.id = uid;
    await DBHelper().insertTask(task);
    // getTask();
    if (connection) await DBCLoud().addTaskToCloud(task);
    await getAllTask();
  }

  deleteTaskInCLoud(String id) async {
    await DBCLoud().delete(id);
  }

  Future<void> deleteTask(String id) async {
    if (connection) {
      await DBCLoud().delete(id);
    } else {
      addTaskToDeleteQueue(id);
    }
    await DBHelper().delete(id);
    // getTask();
    await getAllTask();
  }

  deleteAllTasks() async {
    await DBHelper().deleteAllTasks();
    if (connection) {
      // ignore: avoid_function_literals_in_foreach_calls
      taskList.forEach((task) async {
        DBCLoud().delete(task.id);
      });
    } else {
      for (var task in taskList) {
        addTaskToDeleteQueue(task.id);
      }
    }
    await getAllTask();
  }

  updateTask(Task task) async {
    await DBHelper().update(task);
    getTask();
  }

  completedTask(String id) async {
    if (connection) await DBCLoud().update(id);
    await DBHelper().completed(id);
    // getTask();
    await getAllTask();
  }

  Future<void> getAllTask() async {
    if (!connection) {
      final List<Map<String, dynamic>> tasks = await DBHelper().queryAllRows();
      taskList.assignAll(tasks.map((data) => Task.fromMap(data)).toList());
    } else {
      await DBHelper().deleteAllTasks();
      List<Task> tasks = await DBCLoud().getAllTask();
      taskList.assignAll(tasks);
      // ignore: avoid_function_literals_in_foreach_calls
      tasks.forEach((task) async {
        await DBHelper().insertTask(task);
      });
    }
  }

  Future<void> synchronized() async {
    final List<Map<String, dynamic>> tasks = await DBHelper().queryAllRows();
    taskOff.assignAll(tasks.map((data) => Task.fromMap(data)).toList());
    if (deleteQueue.isNotEmpty) {
      for (int i = 0; i <= deleteQueue.length - 1; ++i) {
        await DBCLoud().delete(deleteQueue[i]);
      }
      deleteQueue.clear();
    }
    // ignore: avoid_function_literals_in_foreach_calls
    taskOff.forEach((task) async {
      // await DBHelper().insertTask(task);
      await taskCollection
          .doc(FirebaseAuth.instance.currentUser!.uid)
          .collection('Tasks')
          .doc(task.id)
          .set({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'isCompleted': task.isCompleted,
      });
    });
    await getAllTask();
    //deleteAllTasks();
  }

  void addTaskToDeleteQueue(String id) {
    deleteQueue.add(id);
  }
}
