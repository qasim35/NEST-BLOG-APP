import { registerAs } from "@nestjs/config";

export default registerAs('blogs',()=>({
    foo:'bar'
}))