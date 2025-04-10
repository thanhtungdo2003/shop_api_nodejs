import express from "express";
import productRouter from './routers/products';
import userRouter from './routers/user';
import statsRouter from './routers/stats';
import categoryRouter from './routers/category';
import orderRouter from "./routers/order"
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:4000","https://fmxqldkamf.ap.loclx.io/shopvntt_fe"],
    credentials: true
}));
app.use('/api', productRouter);
app.use('/api/user', userRouter);
app.use('/api/stats', statsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);

export const viteNodeApp = app;
