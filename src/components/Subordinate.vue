<template>
    <div class="s-content">

        
        <div>
            <load-more tip="下级概览" :show-loading="false" background-color="#fbf9fe"></load-more>
            <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>1级</th>
                        <th>2级</th>
                        <th>3级</th>
                        <th>4级</th>
                        <th>5级</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(item , index) in numbers">{{item}}人</td>
                    </tr>
                </tbody>
            </x-table>
        </div>

        <div>
            <load-more tip="近期佣金" :show-loading="false" background-color="#fbf9fe"></load-more>
            <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>昨日佣金</th>
                        <th>今日佣金</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="color: #FFAD29;">¥100</td>
                        <td style="color: #FFAD29;">¥100</td>
                    </tr>
                </tbody>
            </x-table>
        </div>

        <div style="margin-top:10px;">
            <load-more tip="佣金说明" :show-loading="false" background-color="#fbf9fe"></load-more>
            <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>游戏</th>
                        <th>1级</th>
                        <th>2级</th>
                        <th>3级</th>
                        <th>4级</th>
                        <th>5级</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item , key) in agentFees">
                        <td >{{key}}</td>
                        <td v-for="(subItem , subIndex) in item.split(',')">{{subItem*100}}%</td>
                    </tr>

                </tbody>
            </x-table>
        </div>

    </div>
</template>


<script>
import { XTable, CellFormPreview, Group, Cell, LoadMore } from 'vux'
export default {
    components: {
        XTable,
        CellFormPreview,
        Group,
        Cell, LoadMore
    },
    data() {
        return {
            numbers: [],
            agentFees: []
        }
    },
    mounted() {
        this.$nextTick(() => {


            fetch('api/game/agentFee', { method: 'GET' })
                .then((response) => response.json())
                .then((jsonData) => {
                    if (jsonData.code == 0) {
                        // Object.keys(jsonData.data).forEach(key => {
                        //     if (jsonData.data[key]) {
                        //         this.agentFeesKeys.push(key)
                        //     }
                        // })
                        this.agentFees = jsonData.data
                    } else {
                        console.log(jsonData.msg)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });

            fetch('api/user/subordinates?number=5', { method: 'GET' })
                .then((response) => response.json())
                .then((jsonData) => {
                    if (jsonData.code == 0) {
                        console.log(jsonData.data)
                        this.numbers = jsonData.data
                    } else {
                        console.log(jsonData.msg)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}
</script>

<style>
.s-content {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    width: 100%;
    height:100vh;
    /* background-image: linear-gradient(-135deg, #FAD961 0%, #F76B1C 100%); */
}

.vux-label {
    font-size: 15px;
}
</style>

