import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

import '../models/tasks.dart';

class DBHelper {
  static const _fileName = 'todo_1.db';
  static const _tableName = 'TASK_TABLE';
  static Database? _database;

  Future<Database?> get database async {
    if (_database != null) return _database;
    _database = await _initDB();
    return _database;
  }

  _initDB() async {
    String path = join(await getDatabasesPath(), _fileName);
    print(path);
    return await openDatabase(path, version: 1, onCreate: _onCreate);
  }

  _onCreate(Database db, int version) async {
    await db.execute('CREATE TABLE $_tableName('
        'id TEXT PRIMARY KEY, title TEXT, description TEXT, isCompleted INTEGER'
        ')');
  }

  Future<int> insertTask(Task task) async {
    Database? db = DBHelper._database;
    return await db!.insert(_tableName, {
      'id': task.id,
      'title': task.title,
      'description': task.description,
      'isCompleted': task.isCompleted,
    });
  }

  Future<List<Map<String, dynamic>>> queryAllRows() async {
    Database db = DBHelper._database!;
    return await db.query(_tableName);
  }

  Future<int> delete(String id) async {
    Database? db = DBHelper._database;
    return await db!.delete(_tableName, where: 'id = ?', whereArgs: [id]);
  }

  Future<int> deleteAllTasks() async {
    Database? db = DBHelper._database;
    return await db!.delete(_tableName);
  }

  Future<int> update(Task task) async {
    return await _database!.rawUpdate('''
    UPDATE $_tableName
    SET title = ?, description = ?, isCompleted = ?
    WHERE id = ?
    ''', [task.title, task.description, task.isCompleted, task.id]);
  }

  Future<int> completed(String id) async{
    return await _database!.rawUpdate(
      '''
        UPDATE $_tableName
        SET isCompleted = ?
        WHERE id = ?
      ''',
      [1, id]
    );
  }
}
