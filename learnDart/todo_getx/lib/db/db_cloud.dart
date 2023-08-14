import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:todo_getx/models/tasks.dart';
class DBCLoud{
  CollectionReference taskCollection = FirebaseFirestore.instance.collection("To Do App");
  String uid = FirebaseAuth.instance.currentUser!.uid;

  // DBCLoud(this.db);
  Future<List<Task>> getAllTask() async {
    List<Task> data = [];
    await taskCollection.doc(uid).collection('Tasks').get().then((value) => value.docs.forEach((element) {
      Task task =  Task(id: element['id'], title: element['title'].toString(), description: element['description'].toString(), isCompleted: element['isCompleted']);
      data.add(task);
     }) );
    return data;
  }
  Future<void> delete(String id) async {
    return await taskCollection.doc(uid).collection('Tasks').doc(id.toString()).delete();
  }
  Future<void> deleteAll() async {
    return await taskCollection.doc(uid).delete();
  }
  Future<void> update(String id) async {
    await taskCollection
        .doc(uid)
        .collection('Tasks')
        .doc(id)
        .update({'isCompleted': 1});
  }
   Future<void> addTaskToCloud(Task task) async {
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
  }
}