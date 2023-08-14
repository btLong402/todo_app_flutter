import 'package:flutter/material.dart';
import 'package:flutter_offline/flutter_offline.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:todo_getx/controller/authController.dart';
import 'package:todo_getx/controller/task_controller.dart';
import 'package:google_fonts/google_fonts.dart';
// import 'package:todo_getx/db/db_cloud.dart';
import 'package:todo_getx/models/tasks.dart';
import 'package:todo_getx/views/add_task_page.dart';
import 'package:todo_getx/views/widgets/task_title.dart';
import 'package:flutter_svg/svg.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final AuthController _authController = Get.find();
  final TaskController _taskController = Get.put(TaskController());

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      appBar: AppBar(
        title: const Text('Todo'),
      ),
      drawer: SizedBox(
        width: MediaQuery.of(context).size.width * 0.5,
        child: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              const DrawerHeader(
                decoration: BoxDecoration(color: Color(0xff764abc)),
                child: Text('Drawer Header'),
              ),
              ListTile(
                  leading: const Icon(Icons.delete),
                  title: const Text('Remove all task'),
                  onTap: () {
                    _taskController.deleteAllTasks();
                  }),
              ListTile(
                  leading: const Icon(Icons.refresh),
                  title: const Text('Refresh'),
                  onTap: () {
                    _taskController.synchronized();
                  }),
              ListTile(
                leading: const Icon(
                  Icons.logout,
                ),
                title: const Text('Logout'),
                onTap: () {
                  _authController.logout();
                },
              ),
            ],
          ),
        ),
      ),
      body: OfflineBuilder(
          connectivityBuilder: (BuildContext context,
              ConnectivityResult connectivity, Widget child) {
            final bool connected = connectivity != ConnectivityResult.none;
            if (connected != _taskController.connection) {
              _taskController.connection = connected;
              if (connected) {
                _taskController.synchronized();
              }
            }
            _taskController.getAllTask();
            return Stack(
              fit: StackFit.expand,
              children: [
                child,
                Positioned(
                  left: 0.0,
                  right: 0.0,
                  height: 32.0,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    color: connected
                        ? const Color(0xFF00EE44)
                        : const Color(0xFFEE4400),
                    child: connected
                        ? const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Text(
                                "ONLINE",
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          )
                        : const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Text(
                                "OFFLINE",
                                style: TextStyle(color: Colors.white),
                              ),
                              SizedBox(
                                width: 8.0,
                              ),
                              SizedBox(
                                width: 12.0,
                                height: 12.0,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2.0,
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                      Colors.white),
                                ),
                              ),
                            ],
                          ),
                  ),
                ),
              ],
            );
          },
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      DateFormat.yMMMd().format(DateTime.now()),
                      style: GoogleFonts.lato(
                          textStyle: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w600,
                              color: Colors.black)),
                    ),
                  ],
                ),
                _tasks(),
              ],
            ),
          )),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF4e5ae8),
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
        onPressed: () => Get.to(() => const AddTaskScreen(),
            transition: Transition.downToUp,
            duration: const Duration(milliseconds: 500)),
      ),
    ));
  }

  Widget _tasks() {
    return Expanded(child: Obx(() {
      if (_taskController.taskList.isEmpty) {
        return _noTaskMessage();
      } else {
        return AnimationLimiter(
            child: ListView.builder(
                scrollDirection:
                    MediaQuery.of(context).orientation == Orientation.portrait
                        ? Axis.vertical
                        : Axis.horizontal,
                itemCount: _taskController.taskList.length,
                itemBuilder: (BuildContext context, int index) {
                  Task task = _taskController.taskList[index];
                  return AnimationConfiguration.staggeredList(
                    position: index,
                    duration: Duration(milliseconds: 500 + index * 20),
                    child: SlideAnimation(
                      horizontalOffset: 400.0,
                      child: FadeInAnimation(
                        child: GestureDetector(
                          onTap: () => displayBottomSheet(context, task),
                          child: TaskTile(task: task),
                        ),
                      ),
                    ),
                  );
                }));
      }
    }));
  }

  displayBottomSheet(context, Task task) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bc) {
          return _bottomSheet(task);
        });
  }

  Widget _bottomSheet(Task task) {
    return Container(
      margin: const EdgeInsets.all(20),
      height: MediaQuery.of(context).orientation == Orientation.portrait
          ? MediaQuery.of(context).size.height * 0.2
          : MediaQuery.of(context).size.height * 0.4,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          task.isCompleted == 0
              ? ElevatedButton(
                  onPressed: () {
                    _taskController.completedTask(task.id!);
                    Get.back();
                  },
                  child: const Text('Complete Task'))
              : const SizedBox(
                  height: 0,
                ),
          ElevatedButton(
              onPressed: () {
                _taskController.deleteTask(task.id!);
                Get.back();
              },
              child: const Text('Delete Task')),
          ElevatedButton(
              onPressed: () => Get.back(), child: const Text('Cancel'))
        ],
      ),
    );
  }

  Widget _noTaskMessage() {
    return Center(
      child: SingleChildScrollView(
          child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          MediaQuery.of(context).orientation == Orientation.portrait
              ? const SizedBox(
                  height: 0,
                )
              : const SizedBox(
                  height: 50,
                ),
          SvgPicture.asset(
            'images/task.svg',
            height: 200,
            width: 200,
            semanticsLabel: 'Tasks',
          ),
          const SizedBox(
            height: 20,
          ),
          const Text("There Is No Tasks"),
        ],
      )),
    );
  }
}
