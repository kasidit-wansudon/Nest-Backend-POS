# การเชื่อมโยงระหว่าง ItemsModule, OrderModule, และ RecipesModule

## RecipesModule
`RecipesModule` จัดการข้อมูลเกี่ยวกับสูตรอาหาร (`Recipe`) ซึ่งมีโครงสร้างดังนี้:

### Recipe Model
- **title**: ชื่อของสูตรอาหาร (string, required)
- **ingredients**: รายการส่วนผสม (array of strings, required)
- **instructions**: ขั้นตอนการทำอาหาร (string, required)
- **preparationTime**: เวลาในการเตรียมอาหาร (number, required)
- **cookingTime**: เวลาในการปรุงอาหาร (number, required)
- **servings**: จำนวนที่เสิร์ฟได้ (number, required)
- **category**: ประเภทของอาหาร (string, required)
- **createdAt**: วันที่สร้างสูตรอาหาร (date, default: Date.now)

## ItemsModule
`ItemsModule` จัดการข้อมูลของสินค้า (`Item`) ซึ่งแต่ละสินค้าจะอ้างอิงถึงสูตรอาหารจาก `RecipesModule` ผ่าน `recipe` field:

### Item Model
- **name**: ชื่อของสินค้า (string, required)
- **price**: ราคาของสินค้า (number, required)
- **recipe**: อ้างอิงถึง `Recipe` โดยใช้ `ObjectId` (ref: 'Recipe')

## OrderModule
`OrderModule` จัดการข้อมูลการสั่งซื้อ (`Order`) โดยมีโครงสร้างที่อ้างอิงถึง `ItemsModule`:

### Order Model
- **customerName**: ชื่อของลูกค้าที่สั่งซื้อ (string, required)
- **items**: รายการสินค้าในคำสั่งซื้อ (array of objects, each containing `item` as ObjectId ref: 'Item' and `quantity` as number, required)
- **totalAmount**: ยอดรวมของการสั่งซื้อ (number, required)
- **status**: สถานะของการสั่งซื้อ (string, default: 'pending')
- **createdAt**: วันที่สร้างคำสั่งซื้อ (date, default: Date.now)

## สรุป
ทั้งสามโมดูลนี้ทำงานร่วมกัน โดย `OrderModule` จัดเก็บข้อมูลการสั่งซื้อที่ประกอบด้วยสินค้าจาก `ItemsModule` ซึ่งสินค้านั้นเชื่อมโยงกับสูตรอาหารใน `RecipesModule`. ระบบนี้ช่วยในการติดตามและจัดการข้อมูลการสั่งซื้อ สินค้า และสูตรอาหารได้อย่างมีประสิทธิภาพ.
