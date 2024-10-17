<template>
    <div class="card-root">
        <img src="/icon-512x512.png" alt="avatar">
        <span>Water</span>
        <p>Just do it</p>
    </div>
</template>
<style>
.card-root{
    height:250px;
    margin-bottom: 10px;
    padding:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:var(--color-card-background);;
    box-shadow: var(--color-box-shadow) 0px 3px 8px;
}
.card-root img{
    width:128px;
    height:128px;
    border-radius:50%;
    margin-bottom: 10px;
}
.card-root span{
    font-size:24px;
    font-weight:bold;
    background:var(--color-name);
    background-clip: text;
    -webkit-background-clip: text;
    color:transparent;
}
@media (max-width: 768px) {
    .card-root {
        margin-top:20px;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .card-root img {
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>