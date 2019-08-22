
## Validation in Mongoose
- Three Levels of Validation:
  - Router Level: **Joi**
  - Mongoose Level: **Built-in Validation**
  - Database Level: **MySQL** ...

- Built-in Validation
```javascript
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        minlength: 5,
        maxlength: 150,
        // match: /^data/i // no need to use this one
    },
    category: {
        type: String,
        required: true,
        // 固定的几种
        enum: ['web', 'mobile', 'network'] 
    },
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number, 
        // price is only required when it is published
        required: () => this.isPublished}, 
        min: 10,
        max: 100
    }
});
```
- Custom Validation
```javascript
// Define the database
const courseSchema = new mongoose.Schema({
	tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: "A course at least has one tag"
        }

    },
```
- [Async Validation](https://mongoosejs.com/docs/validation.html#async-custom-validators)
```javascript
// callback way
const courseSchema = new mongoose.Schema({
	tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result =  v && v.length > 0;
                    callback(result);
                }, 2000);
            },
            message: "A course at least has one tag"
        }
    }
});
```