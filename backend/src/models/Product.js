import BaseModel from './BaseModel.js'; import { supabase } from '../config/supabase.js'; import AppError from '../utils/AppError.js';
class ProductModel extends BaseModel {
 constructor(){super('products');}
 async list(q={}) { let query=supabase.from('products').select('*, categories(id,name,slug), product_images(url,alt_text), reviews(rating)', {count:'exact'}).eq('is_active', true);
 if(q.search) query=query.or(`name.ilike.%${q.search}%,brand.ilike.%${q.search}%`); if(q.category) query=query.eq('category_id',q.category); if(q.brand) query=query.ilike('brand',`%${q.brand}%`); if(q.minPrice) query=query.gte('price',q.minPrice); if(q.maxPrice) query=query.lte('price',q.maxPrice); if(q.available==='true') query=query.gt('stock',0);
 const map={price_asc:['price',{ascending:true}],price_desc:['price',{ascending:false}],newest:['created_at',{ascending:false}],rating:['average_rating',{ascending:false}]}; const [column,opts]=map[q.sort]||map.newest; const page=Math.max(Number(q.page)||1,1), limit=Math.min(Math.max(Number(q.limit)||20,1),100); query=query.order(column,opts).range((page-1)*limit,page*limit-1);
 const {data,error,count}=await query; if(error) throw new AppError('Unable to fetch products'); return {data,page,limit,total:count||0}; }
 async details(id){ const {data,error}=await supabase.from('products').select('*, categories(*), product_images(*), product_variants(*), reviews(*, users(name))').eq('id',id).single(); if(error) throw new AppError('Product not found',404); return data; }
}
export default new ProductModel();
