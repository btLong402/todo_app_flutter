import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:todo_getx/controller/task_controller.dart';
import 'package:todo_getx/models/tasks.dart';
import 'package:todo_getx/views/widgets/button.dart';
import 'package:todo_getx/views/widgets/input_field.dart';

class AddTaskScreen extends StatefulWidget {
  const AddTaskScreen({Key? key}) : super(key: key);

  @override
  State<AddTaskScreen> createState() => _AddTaskScreenState();
}

class _AddTaskScreenState extends State<AddTaskScreen> {
  final TaskController _taskController = Get.find();
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Todo'),
          leading: IconButton(
              onPressed: () => Get.back(), icon: const Icon(Icons.arrow_back)),
        ),
        body: SafeArea(
            child: SingleChildScrollView(
          child: Container(
            margin: const EdgeInsets.only(top: 15, left: 20, right: 20),
            child: Form(
              key: _formKey,
              child: Column(children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Add Task",
                      style: TextStyle(
                          color: Color(0xFF121212),
                          fontSize: 23,
                          fontWeight: FontWeight.bold),
                    )
                  ],
                ),
                const SizedBox(
                  height: 25,
                ),
                InputField(
                  label: 'Title',
                  placeHolder: 'Enter Title',
                  controller: _titleController,
                ),
                const SizedBox(
                  height: 20,
                ),
                InputField(
                  label: 'Description',
                  placeHolder: 'Enter Description',
                  controller: _descriptionController,
                ),
                const SizedBox(
                  height: 40,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    ButtonWidget(
                        label: 'Add Task',
                        onTap: () async {
                          if (_formKey.currentState!.validate()) {
                            final Task task = Task();
                            _addTaskToDB(task);
                            await _taskController.addTask(task);
                            // await _taskController.addTaskTest(task);
                            Get.back();
                          }
                        },
                        color: const Color(0xFF121212))
                  ],
                )
              ]),
            ),
          ),
        )));
  }

  _addTaskToDB(Task task) {
    task.isCompleted = 0;
    task.title = _titleController.text;
    task.description = _descriptionController.text;
  }
}
