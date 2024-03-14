<template>
    <div class="buttonAnswerWindow">
        <div v-for="item in contentList" :key="item.label" class="listItem">
            <div v-if="item.value=='content'" v-html="item.label" class="itemcontent"></div>
            <div v-else class="itemoption" @click="chooseButton(item.value)">
                <p v-html="item.label" class="optiontext"></p>
                <img class="optionicon" src="@/assets/img/rightArrow.png">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps,defineEmits,onMounted } from "vue";
interface Inprops {
    contentList:any
}
const props = defineProps<Inprops>()
onMounted(()=>{
    console.log(9998,props.contentList);
    
})
const emit = defineEmits(["choosebutton"])
const chooseButton = (str:string)=>{
  emit("choosebutton",str)
}

</script>

<style lang="less">
.buttonAnswerWindow{
    position: relative;
    width: 96%;
    left: 2%;
    .listItem{
        margin: 8px 0px;
        .itemoption{
            position: relative;
            display: flex;
            background: #557CF0;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            border-radius: 5px;
            justify-content: space-evenly;
            color: #ffffff;
            .optiontext{
                width: 80%;
            }
            .optionicon{
                position: relative;
                width: 6%;
                object-fit: contain;
            }
        }
    }
}
@media screen and (min-width: 600px) {
    .buttonAnswerWindow{
    .listItem{
        .itemoption{
            .optionicon{
                width: 3.5%;
                object-fit: contain;
            }
        }
    }
}
}
</style>
