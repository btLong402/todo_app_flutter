import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:todo_getx/models/tasks.dart';

class TaskTile extends StatelessWidget {
  const TaskTile({Key? key, required this.task}) : super(key: key);
  final Task task;

  @override
  Widget build(BuildContext context) {
    return Container(
        height: MediaQuery.of(context).orientation == Orientation.portrait
            ? MediaQuery.of(context).size.height * 0.2
            : 200,
        width: MediaQuery.of(context).orientation == Orientation.portrait
            ? MediaQuery.of(context).size.width
            : MediaQuery.of(context).size.width * 0.7,
        margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        padding: EdgeInsets.symmetric(
            horizontal: 10,
            vertical: MediaQuery.of(context).orientation == Orientation.portrait
                ? 20
                : 0),
        decoration: BoxDecoration(
            color: task.isCompleted == 0 ? const Color(0xFF4e5ae8) : Colors.green,
            borderRadius: BorderRadius.circular(10)),
        child: Row(
          children: [
            Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('${task.title}',
                        style: GoogleFonts.lato(
                            textStyle: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                                color: Colors.white))),
                    const SizedBox(
                      height: 10,
                    ),
                    Expanded(
                        child: SingleChildScrollView(
                            child: Text(
                      '${task.description}',
                      style: const TextStyle(color: Colors.white),
                    )))
                  ],
                )),
            RotatedBox(
              quarterTurns: 3,
              child: task.isCompleted == 0
                  ? const Text('TODO', style: TextStyle(color: Colors.white))
                  : const Text('COMPLETED', style: TextStyle(color: Colors.white)),
            )
          ],
        ));
  }
}
