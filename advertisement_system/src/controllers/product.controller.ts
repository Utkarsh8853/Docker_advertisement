import { Request,Response } from "express";
import Product from "../database/models/product.model";
import fs from "fs";
import Image from "../database/models/image.model";
import Category from "../database/models/categories.model";
import { Op, QueryTypes, json } from "sequelize";
import sequelize from "../database/database";

class ProductController {

    async addProduct(req:Request, res:Response) {
        try {
            const user_id = req.body.id;
            const {name, description, base_price, category_id, address_id } = req.body;
                const result = await Product.create({name: name, description:description, base_price:base_price,bidding_price:base_price,bidding_user_id:user_id,category_id:category_id, address_id:address_id,seller_id:user_id});
                console.log('Product added',result);
                return res.status(200).json({result: "product added"});
        } catch(err) {
            console.error(err);
            return res.status(200).json({result: "Please send proper detail"});
        }
    }

    async addProductImage(req:Request, res:Response) {
        try {
            const {product_id} = req.body;
            const user_id = req.body.id;
            const file:any = req.file;
            console.log(file.buffer);
            const fileData = fs.readFileSync(file.path);
            const bufferData = Buffer.from(fileData);
            console.log(bufferData);
            await Image.create({image :bufferData, user_id:user_id, product_id:product_id});
            fs.unlink(file.path, (data) => {
                console.log("File deleted");
            });
            return res.status(200).send("Product image uploaded");  
        } catch(err) {
            console.error(err);
            return res.status(200).send("Product image is not uploaded");
        }
    }

    async viewProduct(req:Request, res:Response) {
        try {
            const {product_id} = req.body;
            const result: any = await Product.findOne({where:{id: product_id}});
                console.log('Product added',result);
                return res.status(200).json({result});
        } catch(err) {
            console.error(err);
            return res.status(200).json({result: "wrong product id"});
        }
    }

    async bidding(req:Request, res:Response) {
        try {
            const user_id =req.body.id;
            const {product_id,new_bidding_price} = req.body;
            const check1:any = await Product.findOne({where:{id: product_id}});
            console.log("check1  ",check1);
            
            if(check1){
                const check2:any = await Product.findOne({where:{id: product_id,seller_id:user_id}});
                console.log("check2  ",check2);
                if(check2){
                    return res.status(400).send("You cannot bid on your own product")
                }
                else if(check1.bidding_price>=new_bidding_price){
                    return res.status(400).send("bidding prize must greater than base price")
                }
                const result = await Product.update({bidding_price: new_bidding_price, bidding_user_id : user_id},{where: {id:product_id}});
                console.log('Bidding done ',result);
                return res.status(200).send("Bidding done")
            }
            return res.status(400).send("Worng user id")
        } catch(err) {
            console.error(err);
            return res.status(200).json({result: "wrong product id"});
        }
    }

    async removeProduct(req:Request, res:Response) {
        try {
            const {product_id} = req.body;
            await Product.destroy({where:{id:product_id}})
            try {
                await Image.destroy({where:{product_id:product_id}})
            } catch (error) {
                return res.status(200).send('Product removed');
            }
            return res.status(200).send('Product removed');

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong product id');
        }
    }

    async updateProduct(req:Request, res:Response) {
        try {
            const product_id = req.body;
            const {name, description, base_price, category_id, address_id} = req.body;
            await Product.update({name: name, description:description, base_price:base_price,category_id:category_id, address_id:address_id},{where: {id:product_id}});
            return res.status(200).send('Product info updated');

        } catch(err) {
            console.error(err);
            return res.status(400).send('provide proper information');
        }
    }

    async removeProductImage(req:Request, res:Response) {
        try {
            const {image_id} = req.body;
            await Image.destroy({where:{id:image_id}})
            return res.status(200).send('Product image removed');

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong image id');
        }
    }

    async filter(req:Request, res:Response) {
        try {
            const {category_id} = req.body;
            console.log('//////////////////////////////////////////////',category_id);
            // const allProductId = JSON.stringify(await Category.findAll({where:{[Op.or]:[{parent_id: category_id},{id: category_id}]},attributes: ['id']}))
            // const arrayOfId= Object.values(JSON.parse(allProductId)).map((obj: any) => obj.id);
            // console.log(arrayOfId);
            // const result = await Product.findOne({
            //     attributes: [
            //       [sequelize.fn('GROUP_CONCAT', sequelize.col(category_id)), 'ids']
            //     ]
            //   });
            // const query = await sequelize.query(`SELECT array_agg(id) AS ids FROM categories `);
            const query:any = await sequelize.query(`SELECT array_agg(id) AS ids FROM categories WHERE "categories"."parent_id" = ${category_id} OR "id" = ${category_id}`, { type: QueryTypes.SELECT });
            const category_list=JSON.parse(JSON.stringify(query))[0].ids;
            console.log(category_list);
            
            const products = await Product.findAll({
                attributes: ['name'],
                where: {
                  category_id: category_list,
                }
              });
              console.log(products);
            return res.status(200).json(products);

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong category id');
        }
    }
    
}

export const productController = new ProductController();

// GUI, Datatypes, pub-sub in redis