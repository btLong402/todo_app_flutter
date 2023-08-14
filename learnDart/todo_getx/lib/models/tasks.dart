class Task {
  String? id;
  String? title;
  String? description;
  int? isCompleted;
  Task ({this.id, this.title, this.description, this.isCompleted});

  Map<String, dynamic> toMap() {
    return {
      'id' : id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
    };
  }

  Task.fromMap(Map<String, dynamic> task) {
    id = task['id'];
    title = task['title'];
    description = task['description'];
    isCompleted = task['isCompleted'];
  }

  Task.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    description = json['description'];
    isCompleted = json['isCompleted'];
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
    };
  }
}