<template>
    <div>
        <h2>Users</h2>
        <ul>
            <li v-for="user in ['Paul', 'Graham', 'John']">
                {{ user }}
            </li>
        </ul>
    </div>
</template>
