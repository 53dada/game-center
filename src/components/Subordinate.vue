<template>
    <div class="s-content">

        <div style="padding:5%;margin-top:0.4rem">
            <div style="text-align: center;width:100%;margin-bottom:0.3rem;">
                <span style="font-size:0.3rem;">近期佣金</span>
            </div>
            <table style="width:100%">
                <thead>
                    <tr style="width:100%">
                        <th>近7日佣金</th>
                        <th>昨日佣金</th>
                        <th>今日佣金</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="width:100%;text-align: center">
                        <td>¥{{weekValue}}</td>
                        <td>¥{{yesterdayValue}}</td>
                        <td>¥{{todayValue}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div style="padding:5%">
            <div style="text-align: center;width:100%;margin-bottom:0.3rem;">
                <span style="font-size:0.3rem;">下级概览</span>
            </div>
            <table style="width:100%">
                <thead>
                    <tr style="width:100%">
                        <th>1级</th>
                        <th>2级</th>
                        <th>3级</th>
                        <th>4级</th>
                        <th>5级</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="width:100%;text-align: center">
                        <td v-for="(item , index) in numbers">{{item}}人</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="text-align: left;padding-left:5%;padding-right:5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最多拥有5级下线，每个级别获得佣金不一样，具体数据请继续向下查看。</span>
        </div>

        <div style="padding:5%">
            <div style="text-align: center;width:100%;margin-bottom:0.3rem;">
                <span style="font-size:0.3rem;">佣金利率</span>
            </div>
            <table style="width:100%">
                <thead>
                    <tr style="width:100%">
                        <th>游戏</th>
                        <th>1级</th>
                        <th>2级</th>
                        <th>3级</th>
                        <th>4级</th>
                        <th>5级</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item , key) in agentFees" style="width:100%;text-align: center">
                        <td>{{key}}</td>
                        <td v-for="(subItem , subIndex) in item.split(',')">{{subItem*100}}%</td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div style="text-align: left;margin-bottom:0.05rem;padding-left:5%;padding-right:5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温馨提示:邀请越多的小伙伴加入游戏，收益会越来越多哦，邀请排行榜每日上榜者也会获得额外奖励。</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假如您邀请了10个小伙伴来玩游戏,每个小伙伴又邀请了10个小伙伴来玩游戏,以此类推,如果每个小伙伴玩了100块钱那么佣金获取规则如下:</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:4.5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.假如你的5级下线游戏了100块钱,那么你可以获得100x0.5%=0.5块钱收益</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:4.5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.假如你的4级下线游戏了100块钱,那么你可以获得100x0.5%=0.5块钱收益</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:4.5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.假如你的3级下线游戏了100块钱,那么你可以获得100x0.5%=0.5块钱收益</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:4.5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.假如你的2级下线游戏了100块钱,那么你可以获得100x1%=1块钱收益</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:4.5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.假如你的1级下线游戏了100块钱,那么你可以获得100x2.5%=2.5块钱收益</span>
        </div>
        <div style="text-align: left;;margin-bottom:0.05rem;padding-left:5%;padding-right:4.5%">
            <span style="font-size:0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.每个游戏的佣金利率不同,可参照上面的表格信息</span>
        </div>
        <div v-transfer-dom>
            <loading :show="loading" text="加载中"></loading>
        </div>
    </div>
</template>


<script>
import { dateFormat, numberComma, XTable, CellFormPreview, Group, Cell, LoadMore, TransferDomDirective as TransferDom, Loading } from 'vux'
import api from '../common/Request'
export default {
    directives: {
        TransferDom
    },
    components: {
        XTable,
        CellFormPreview,
        Group,
        Cell, LoadMore, Loading
    },
    data() {
        return {
            numbers: [],
            agentFees: [],
            loading: true,
            yesterdayValue: 0,
            todayValue: 0,
            weekValue: 0
        }
    },
    async created() {
        let now = new Date();
        let time = 60 * 1000 * 60 * 24;
        //昨日
        let yesterdayData = await api.queryCommissionSum({
            start: dateFormat(new Date(now.getTime() - time), 'YYYY-MM-DD'),
            end: dateFormat(now, 'YYYY-MM-DD')
        })
        this.yesterdayValue = numberComma(yesterdayData.data)

        //今日
        let todayData = await api.queryCommissionSum({
            start: dateFormat(now, 'YYYY-MM-DD'),
            end: dateFormat(new Date(now.getTime() + time), 'YYYY-MM-DD')
        })
        this.todayValue = numberComma(todayData.data)

        //近七日
        let weekData = await api.queryCommissionSum({
            start: dateFormat(new Date(now.getTime() - time * 7), 'YYYY-MM-DD'),
            end: dateFormat(now, 'YYYY-MM-DD')
        })
        this.weekValue = numberComma(weekData.data)

        let res = await api.agentFee()
        this.agentFees = res.data


        let res2 = await api.subordinates({
            number: 5
        })
        this.numbers = res2.data
        this.loading = false
    }
}
</script>

<style>
.s-content {

    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    width: 100%;
    height: 100vh;
    background: url(../assets/subordinatebg.jpg) center no-repeat;
    background-size: 100% 100%;
}

.vux-label {
    font-size: 15px;
}

table,
td,
th {
    border: 1px solid black;
}

table {
    border-collapse: collapse;
}
</style>

