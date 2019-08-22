

## Connect with Node.js
- Install `yarn add mongoose`
- Create `connect.js`

## Concept
- Mongo Concept
  - **collection**: similar to one **table** in the relational database
  - **document**: similar to one **row** in the relational database
- Mongoose Concept
  - **schema**: define the shape of **documents**, used to create model
  - **model**: correspont to **class** in javascript, referring to **collections**
- Mongoose Data Types
  -  String Number(包含小数) Date Boolean Array Map 
  - Mixed ObjectId Decimal128 Buffer

## CRUD
### Define Collections
```javascript
// Define the database
const courseSchema = new mongoose.Schema({
	// 使得unique生效，必须删除数据库，重启服务，才可以
	name: { type: String, required: true, unique: true },
	author: String,
	tags: [ String ], // this means a list of string
	date: { type: Date, default: Date.now },
	isPublished: Boolean
});

// class Course <=> collection 'Course'
const Course = mongoose.model('Course', courseSchema);
```
### Create
```javascript
// CREATE operation
const data = {
	name: 'Database Management',
	author: 'James Tan',
	tags: [ 'node', 'backend' ],
	// use default value for date
	isPublished: true
};

async function createSingleCourse(data) {
	// create an instance
	const course = new Course(data);

	// return a promise
	const result = await course.save();
	console.log(result);
}

createSingleCourse(data);
```
### Read
* Compare Operator
  * `$eq`: equal
  * `$ne`: not equal
  * `$gt`: greater than
  * `$gte`: greater than or equal to
  * `$lt`: less than
  * `$lte`: less than or equal to
  * `$in`: in
  * `$nin`: not in
* Logical Opeartor
  * `or`: or
  * `and` :and
---
- READ Operation - Get **All** Courses
```javascript
async function getAllCourses() {
	const courses = await Course.find();
	console.log(courses);
}
getAllCourses();
```

- READ Operation - query using **filter**
```javascript
async function getCourse() {
	const courses = await Course.find({ name: 'Database Management' })
		.limit(10)
		.sort({ name: 1 }) // 1 for ascending order
		.select({ name: 1, tags: 1 });
	console.log(courses);
}
getCourse();

```
- READ Operation - query **compare**
```javascript
async function getCourseCompare() {
    const courses = await Course
        // .find({ price: {$gt: 11}})
        .find({ price: {$in: [10.2,30]}})
		.limit(10)
		.sort({ name: 1 }) // 1 for ascending order
		.select({ name: 1, tags: 1 });
	console.log(courses);
}
getCourseCompare();
```
 - READ Operation - query compare **OR AND**
```javascript
async function getCourseCompareOr() {
    const courses = await Course
        .find() // find() is necessary
        .or({price: {$gt: 15}}, {name: "Database Management"})
		.limit(10)
		.sort({ name: 1 }) // 1 for ascending order
		.select({ name: 1, tags: 1, price:1 });
	console.log(courses);
}
getCourseCompareOr();

```
- READ Operation - query compare **Regular Expression**
```javascript
async function getCourseCompareRegular() {
    const courses = await Course
        .find({name: /^data/i }) // start with data or Data
		.limit(10)
		.sort({ name: 1 }) // 1 for ascending order
		.select({ name: 1, tags: 1, price:1 });
	console.log(courses);
}
getCourseCompareRegular();

```
-  READ Operation - query **count**
```javascript
async function getCourseCompareCount() {
    const courses = await Course
        .find({name: /^data/i }) // start with data or Data
		.limit(10)
		.sort({ name: 1 }) // 1 for ascending order
        .select({ name: 1, tags: 1, price:1 })
        .countDocuments();
	console.log(courses);
}
getCourseCompareCount();
```
 - READ Operation - query **pagination**
```javascript
async function getCourseComparePagination() {
    // /api/courses?pageNumber=2&pageSize=10
    const pageNumber = 1; // 第几页
    const pageSize = 10; // 一页几个documents
    const courses = await Course
        .find() // start with data or Data

        // these two lines are the pagination
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        
		.sort({ name: 1 }) // 1 for ascending order
        .select({ name: 1, tags: 1, price:1 })
	console.log(courses);
}
getCourseComparePagination();
```

### Update

- When you need to check the **existence** of document at first

```javascript
// UPDATE Operation - find + save
// when you need to check if the record exists or not
async function findThenUpdateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.name = "Java";
    course.tags = ["backend","OOP"];
    course.price = 15;
    const result = await course.save();
    console.log(result);
}
findThenUpdateCourse("5c919cb9310fd622b1db90bd");
```

- When you confirm the existence of document [Update Operator](https://docs.mongodb.com/manual/reference/operator/update/)

```javascript
// UPDATE Operation - direct update
// when you confirm the course already exists
async function updateCourse(id) {
    const result = await Course.update(
        { _id:id, isPublished: false},
        { $set: {
            author: "Mosh",
            isPublished: true
        }});
    console.log(result);
}
updateCourse("5c919cb9310fd622b1db90bd");
```


- When you want to get the **old documents** as results.

```javascript
// UPDATE Operation - update with old as result
async function updateCourseWithOldRecords(id) {
    const result = await Course.findByIdAndUpdate(id,
        { $set: {
            author: "Mosh",
            isPublished: true
        }});
    console.log(result);
}
updateCourseWithOldRecords("5c919cb9310fd622b1db90bd");
```


- When you want to get the **updated documents** as results.

```javascript
// UPDATE Operation - update with new as result
async function updateCourseWithUpdatedRecord(id) {
    const result = await Course.findByIdAndUpdate(id,
        { $set: {
            author: "Mosh",
            isPublished: true
        }},{new:true});
    console.log(result);
}
updateCourseWithUpdatedRecord("5c919cb9310fd622b1db90bd");
```

### Delete
- delete the first one found
```javascript
async function removeCourse(id) {
    const result = await Course.deleteOne({_id: id})
    console.log(result);
}
removeCourse("5c919cb9310fd622b1db90bd");
```
- delete any found
```javascript
async function removeCourse(id) {
    const result = await Course.deleteMany({isPublished:true})
    console.log(result);
}
removeCourse("5c919cb9310fd622b1db90bd");
```
